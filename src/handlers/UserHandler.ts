import {supabase} from "./DatabaseHandler";

export const signInUserPasswordless = async (email: string) => {
    const {data, error: authError} = await supabase.auth.signInWithOtp({
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

    if (!session?.user?.id || authError) {
        return "Token verificatie mislukt";
    }

    return;
}

export const isUserLoggedIn = () => {
    const user = supabase.auth.getUser();

    return !!user;
}