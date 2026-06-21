import {supabase} from "./DatabaseHandler";
import {AccountModel} from "../models/AccountModel";

type AccountInput = {
    email: string;
    is_admin: boolean;
    active: boolean;
}

const ACCOUNT_TABLE = `account-types`;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const parseAccountModel = (data: any): AccountModel => ({
    ...data,
    created_at: new Date(data.created_at),
});

const canCurrentUserManageAccounts = async () => {
    const userResult = await supabase.auth.getUser();

    const currentUserEmail = userResult.data.user?.email;

    if (userResult.error || !currentUserEmail) {
        return false;
    }

    const currentAccount = await fetchAccountByEmailFromDatabase(currentUserEmail);

    return !!currentAccount?.is_admin && !!currentAccount?.active;
}

export const fetchAccountsFromDatabase = async () => {
    const result = await supabase.from(ACCOUNT_TABLE)
        .select(`*`)
        .order(`created_at`, { ascending: false });

    if (result.error || !result.data) {
        console.error(result.error);
        return null;
    }

    const parsedIntoModel: AccountModel[] = result.data.map(parseAccountModel);

    return parsedIntoModel;
}

export const fetchAccountByEmailFromDatabase = async (email: string) => {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) return null;

    const result = await supabase.from(ACCOUNT_TABLE)
        .select(`*`)
        .eq(`email`, normalizedEmail)
        .maybeSingle();

    if (result.error) {
        console.error(result.error);
        return null;
    }

    if (!result.data) {
        return null;
    }

    return parseAccountModel(result.data);
}

export const linkAccountOnLogin = async (email: string) => {
    // Schema no longer stores auth linkage metadata, so only validate the account exists.
    await fetchAccountByEmailFromDatabase(email);
}


export const fetchAccountBySupabaseUserIdFromDatabase = async () => {
    const userResult = await supabase.auth.getUser();

    if (userResult.error || !userResult.data.user?.email) {
        if (userResult.error) console.error(userResult.error);
        return null;
    }

    return fetchAccountByEmailFromDatabase(userResult.data.user.email);
}

export const fetchAccountBySupabaseEmailFromDatabase = async (email: string) => {
    const result = await fetchAccountByEmailFromDatabase(email);

    if (!result) {
        return null;
    }

    return result;
}

const addAccountToDatabase = async (account: Partial<AccountModel>) => {
    const result = await supabase.from(ACCOUNT_TABLE).insert(account).select().single();

    if (result.error || !result.data) {
        console.error(result.error);
        return null;
    }

    return parseAccountModel(result.data);
}

export const updateAccountInDatabase = async (id: number, account: Partial<AccountModel>) => {
    const result = await supabase.from(ACCOUNT_TABLE).update(account).eq(`id`, id).select().single();

    if (result.error || !result.data) {
        console.error(result.error);
        return null;
    }

    return parseAccountModel(result.data);
}

export const deleteAccountFromDatabase = async (id: number) => {
    const result = await supabase.from(ACCOUNT_TABLE).delete().eq(`id`, id);

    if (result.error) {
        console.error(result.error);
        return null;
    }

    return true;
}

export const addAccountItem = async (account: AccountInput) => {
    const isAllowed = await canCurrentUserManageAccounts();

    if (!isAllowed) return { data: null, error: `Je hebt geen rechten om accounts te beheren.` };

    const normalizedEmail = normalizeEmail(account.email);

    if (!normalizedEmail) return { data: null, error: `Vul een e-mailadres in.` };

    const existingAccount = await fetchAccountByEmailFromDatabase(normalizedEmail);

    if (existingAccount) {
        return { data: null, error: `Er bestaat al een account met dit e-mailadres.` };
    }

    // Send OTP invite — creates the Supabase auth user if not yet present.
    const { error: inviteError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { shouldCreateUser: true },
    });

    if (inviteError) return { data: null, error: `Uitnodiging kon niet worden verzonden: ${inviteError.message}` };

    // Store only fields that still exist in the simplified accounts schema.
    const response = await addAccountToDatabase({
        email: normalizedEmail,
        is_admin: account.is_admin,
        active: account.active,
    });

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het account.` };

    return { data: response, error: null };
}

export const updateAccountItem = async (id: number, account: Partial<AccountInput>) => {
    const isAllowed = await canCurrentUserManageAccounts();

    if (!isAllowed) return { data: null, error: `Je hebt geen rechten om accounts te beheren.` };

    if (!id || id < 0) return { data: null, error: `Er is een fout opgetreden bij het bewerken van het account.` };

    const accountUpdate = {
        ...account,
        ...(account.email ? { email: normalizeEmail(account.email) } : {}),
    };

    const response = await updateAccountInDatabase(id, accountUpdate);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het bewerken van het account.` };

    return { data: response, error: null };
}
