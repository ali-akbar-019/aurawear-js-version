import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteUserDialog = ({
    deleteDialogOpen,
    setDeleteDialogOpen,
    deletingUser,
    handleDeleteUser
}) => {
    return (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="max-w-sm bg-slate-900 border border-slate-700 text-slate-50">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-50">Delete User</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-slate-300">
                        Are you sure you want to delete{" "}
                        <strong className="text-slate-50">{deletingUser?.name}</strong>? This action cannot be undone.
                    </p>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => setDeleteDialogOpen(false)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteUser}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteUserDialog;