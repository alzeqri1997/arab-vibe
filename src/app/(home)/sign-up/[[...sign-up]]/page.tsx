import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex flex-col max-w-3xl mx-auto w-full'>
            <section className='space-y-6 pt-[16vh] item-center'>
                <SignUp /> 
            </section>
        </div>
    )
}