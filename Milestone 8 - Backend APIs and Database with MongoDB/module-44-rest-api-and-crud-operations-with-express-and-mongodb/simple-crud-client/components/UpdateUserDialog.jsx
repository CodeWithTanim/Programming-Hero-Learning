import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';

const UpdateUserDialog = ({ user }) => {
    const router = useRouter()
    const handleUpdateUser = async (e) => {
        console.log('update user from submitted')
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updateUser = Object.fromEntries(formData.entries())
        console.log('Updated user', updateUser);
        const res = await fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser),
        })
        const result = await res.json();
        console.log('Result from Server', result);
        if (result.modifiedCount > 0) {
            console.log('User Updated Successfully');
            router.refresh();
        }

    }
    return (
        <Dialog>
            <DialogTrigger render={<Button className='mx-4' variant="outline">Edit</Button>} />
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleUpdateUser}>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" type='text' name="name" defaultValue={user.name} />
                        </Field>
                        <Field>
                            <Label htmlFor="email-1">User Email</Label>
                            <Input id="email-1" type='email' name="email" defaultValue={user.email} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <DialogClose render={<Button type="submit">Save changes</Button>} />
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    );
};

export default UpdateUserDialog;