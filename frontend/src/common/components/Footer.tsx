import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
      <footer className="text-white bg-zinc-900 py-12">
        <div className="container mx-auto">
            <div className="flex justify-around">
                <div>
                  <h6>Atalhos</h6>
                  <ul className="underline">
                      <li>
                        <Link href="/produtos">Produtos</Link>
                      </li>
                      <li>
                        <Link href="/contato">Contato</Link>
                      </li>
                      <li>
                        <Link href="/simulador">Simulador</Link>
                      </li>
                  </ul>
                </div>
                <div>
                    <h6>Sobre nós</h6>
                    <p className="max-w-4xl">Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                </div>
            </div>
            <h5 className="text-center mt-5">Monster Physique</h5>
        </div>
      </footer>
    );
}

export default Footer;