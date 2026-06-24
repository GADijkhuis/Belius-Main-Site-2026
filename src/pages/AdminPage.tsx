import Header from "../components/Header";
import Footer from "../components/Footer";
import Line from "../components/assets/Line";
import {useEffect, useState} from "react";
import {Button, Caption1, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Input, Label, Spinner, Subtitle1} from "@fluentui/react-components";
import {isUserAdmin} from "../handlers/UserHandler";
import {navigateToPage} from "../handlers/RouteHandler";
import {addAccountItem, fetchAccountsFromDatabase, updateAccountItem} from "../handlers/AccountHandler";
import {AccountModel} from "../models/AccountModel";

const AdminPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [accounts, setAccounts] = useState(new Array<AccountModel>());
    const [error, setError] = useState(``);
    const [dialogError, setDialogError] = useState(``);
    const [selectedAccount, setSelectedAccount] = useState<AccountModel | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [form, setForm] = useState({
        email: ``,
        is_admin: false,
        active: true,
    });

    const loadAccounts = () => {
        fetchAccountsFromDatabase().then((response) => {
            setIsLoading(false);

            if (!response) {
                setError(`Er konden geen accounts worden geladen.`);
                return;
            }

            setError(``);
            setAccounts(response);
        });
    }

    useEffect(() => {
        isUserAdmin().then((r) => {
            setIsAdmin(r);

            if (!r) {
                setIsLoading(false);
                return;
            }

            loadAccounts();
        });
    }, []);

    const openAddDialog = () => {
        setSelectedAccount(null);
        setDialogError(``);
        setForm({
            email: ``,
            is_admin: false,
            active: true,
        });
        setDialogOpen(true);
    }

    const openEditDialog = (account: AccountModel) => {
        setSelectedAccount(account);
        setDialogError(``);
        setForm({
            email: account.email,
            is_admin: account.is_admin,
            active: account.active,
        });
        setDialogOpen(true);
    }

    const saveAccount = async () => {
        setDialogError(``);
        setIsSaving(true);

        const response = selectedAccount ?
            await updateAccountItem(selectedAccount.id, {
                email: form.email,
                is_admin: form.is_admin,
                active: form.active,
            })
            : await addAccountItem({
                email: form.email,
                is_admin: form.is_admin,
                active: form.active,
            });

        setIsSaving(false);

        if (response.error) {
            setDialogError(response.error);
            return;
        }

        setDialogOpen(false);
        loadAccounts();
    }

    return (
        <>
            <Header />
            <div className={`body-container`}>
                <Subtitle1>Admin</Subtitle1>
                { isLoading && <Spinner /> }
                { !isLoading && !isAdmin &&
                    <div className={`flex flex-column flex-gap-small`}>
                        <p>Je hebt geen toegang tot deze pagina.</p>
                        <Button as={`a`} className={`button`} appearance={`primary`} onClick={() => navigateToPage(``)}>
                            Terug naar home
                        </Button>
                    </div>
                }
                { isAdmin && !isLoading &&
                    <>
                        {error && <p>{error}</p>}
                        <div className={`mb-medium`}>
                            <Dialog open={dialogOpen}>
                                <DialogTrigger disableButtonEnhancement>
                                    <Button as={`a`} className={`button`} appearance={`primary`} onClick={openAddDialog}>
                                        Gebruiker toevoegen
                                    </Button>
                                </DialogTrigger>
                                <DialogSurface className={`dialog`}>
                                    <DialogBody>
                                        <DialogTitle>{selectedAccount ? `Gebruiker bewerken` : `Gebruiker toevoegen`}</DialogTitle>
                                        <DialogContent>
                                            <form className={`flex flex-column flex-gap-medium`}>
                                                <div className={`flex flex-column`}>
                                                    <Label>E-mail</Label>
                                                    <Input type={`email`} value={form.email} disabled={!!selectedAccount} onChange={(e) => setForm({...form, email: e.target.value})} />
                                                </div>
                                                <label className={`flex flex-gap-small`}>
                                                    <input type={`checkbox`} checked={form.is_admin} onChange={(e) => setForm({...form, is_admin: e.target.checked})} />
                                                    Admin
                                                </label>
                                                <label className={`flex flex-gap-small`}>
                                                    <input type={`checkbox`} checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} />
                                                    Actief
                                                </label>
                                                {dialogError && <Caption1>{dialogError}</Caption1>}
                                            </form>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button as={`a`} className={`button`} onClick={() => setDialogOpen(false)}>
                                                Annuleren
                                            </Button>
                                            <Button as={`a`} className={`button`} appearance={`primary`} onClick={saveAccount} disabled={isSaving}>
                                                Opslaan
                                            </Button>
                                            {isSaving && <Spinner size={`extra-tiny`} />}
                                        </DialogActions>
                                    </DialogBody>
                                </DialogSurface>
                            </Dialog>
                        </div>
                        <div className={`admin-table-wrapper`}>
                            <table className={`width-100`}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>E-mail</th>
                                        <th>Admin</th>
                                        <th>Actief</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((account) => (
                                        <tr key={account.id}>
                                            <td>{account.id}</td>
                                            <td>{account.email}</td>
                                            <td>{account.is_admin ? `Ja` : `Nee`}</td>
                                            <td>{account.active ? `Ja` : `Nee`}</td>
                                            <td>
                                                <div className={`flex flex-gap-small`}>
                                                    <Button as={`a`} className={`button`} onClick={() => openEditDialog(account)}>
                                                        Bewerken
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                }
                <Line />
                <Footer />
            </div>
        </>
    );
}

export default AdminPage;


