import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-5">
                        <div className="grid gap-2.5">
                            <Label 
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                readOnly
                                className="bg-slate-50 dark:bg-slate-900"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2.5">
                            <Label 
                                htmlFor="password"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                New Password
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="Enter your new password"
                                passwordrules={passwordRules}
                                className="transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2.5">
                            <Label 
                                htmlFor="password_confirmation"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Confirm New Password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Re-enter your new password"
                                passwordrules={passwordRules}
                                className="transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button
                            type="submit"
                            className="mt-2 h-11 w-full cursor-pointer text-base font-semibold shadow-sm transition-all duration-200 hover:shadow-md"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            {processing ? 'Resetting password...' : 'Reset password'}
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset your password',
    description: 'Please enter your new password below',
};
