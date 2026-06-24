import {supabase} from "./DatabaseHandler";
import {fetchAccountByEmailFromDatabase, linkAccountOnLogin} from "./AccountHandler";

export const signInUserPasswordless = async (email: string) => {
    const account = await fetchAccountByEmailFromDatabase(email);

    console.log(account);

    if (!account || !account.active) {
        return "Je account is niet actief of bestaat niet.";
    }

    const {error: authError} = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false
        }
    })

    if (authError) {
        return "Er is een onverwachte fout opgetreden bij het inloggen.";
    }

    return;
}

export const verifyOTP = async (email: string, token: string)=>  {
    const {data: { session }, error: authError} = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: 'email',
    });

    if (!session?.user?.email || authError) {
        return "Token verificatie mislukt";
    }

    await linkAccountOnLogin(session.user.email ?? email);

    const account = await fetchAccountByEmailFromDatabase(session.user.email ?? email);

    if (!account || !account.active) {
        await supabase.auth.signOut();
        return "Je account is niet actief of bestaat niet.";
    }

    return;
}

export const signOutUser = async () => {
    await supabase.auth.signOut();
    window.location.reload();
}

export const isUserLoggedIn = async () => {
    const result = await supabase.auth.getUser();

    return (!(result.error) && !!(result?.data?.user));
    // return !!user;
}

export const getCurrentUserAccount = async () => {
    const result = await supabase.auth.getUser();

    if (result.error || !result.data.user) {
        return null;
    }

    if (!result.data.user.email) {
        return null;
    }

    return fetchAccountByEmailFromDatabase(result.data.user.email);
}

export const isUserAdmin = async () => {
    const account = await getCurrentUserAccount();

    return !!account?.is_admin && !!account?.active;
}

