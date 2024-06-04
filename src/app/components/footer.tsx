import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-center pt-10 bg-base-300 text-base-content">
            <aside>
                <Link href={'https://www.alpinetech.fr/'}><Image className="dark-image" src={"/logotexte-light.png"} width={200} height={200} alt="Logo AlpineTech"/></Link>
                <Link href={'https://www.alpinetech.fr/'}><Image className="light-image" src={"/logotexte-dark.png"} width={200} height={200} alt="Logo AlpineTech"/></Link>
                <p className="italic">Summiting Innovation.</p>
                <br />
                <p>Copyright © 2024 - All rights reserved</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link target="blank" href="https://www.linkedin.com/in/raphael-tournafond/" className="m-1 w-6 hover:scale-110 transition-transform duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" className="fill-current"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg></Link>
                    <Link target="blank" href="https://x.com/RTournafond" className="m-1 w-6 hover:scale-110 transition-transform duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" className="fill-current"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"></path></svg></Link>
                    <Link href="mailto:contact.alpinetech@proton.me" className="m-1 w-6 hover:scale-110 transition-transform duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" className="fill-current"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg></Link>
                </div>
            </nav>
            <p className="px-2 flex lg:justify-normal lg:items-start justify-center items-center text-sm">Made in the 🏔️ by<a href="https://www.alpinetech.fr/" className="underline">Alpine<span className="text-info">Tech</span></a></p>
        </footer>
    );
};

export default Footer