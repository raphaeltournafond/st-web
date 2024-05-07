import Image from "next/image"

export default function NotFoundPage() {
    return (
        <>
            <div className="hero min-h-screen bg-base-100 text-base-content">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-5xl font-bold">404.</h1>
                        <p className="py-6">The server couldn&apos;t find the requested resource.</p>
                    </div>
                    <Image src="/not-found.gif" alt="Vincent Vega lost meme." className="max-w-sm rounded-lg m-10" width={500} height={500} />
                </div>
            </div>
        </>
    )
}