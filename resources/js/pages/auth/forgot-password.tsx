// Components
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-800 dark:border-green-900/50 dark:bg-green-950/50 dark:text-green-200">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
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
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                    className="transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="mt-6 flex items-center justify-start">
                                <Button
                                    className="h-11 w-full cursor-pointer text-base font-semibold shadow-sm transition-all duration-200 hover:shadow-md"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && <Spinner />}
                                    {processing ? 'Sending link...' : 'Send reset link'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                            Remember your password?
                        </span>
                    </div>
                </div>

                <div className="text-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Return to{' '}
                    </span>
                    <TextLink 
                        href={login()}
                        className="cursor-pointer text-sm font-semibold text-slate-900 transition-colors duration-200 hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300"
                    >
                        sign in
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot your password?',
    description: 'Enter your email to receive a password reset link',
};
