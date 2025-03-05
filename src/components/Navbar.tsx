"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "app/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            MyBrand
          </div>

          {/* Menú en pantallas grandes */}
          <div className="hidden md:flex space-x-6">
            {/* Link de los componetes usando Link de next */}
            <Link href={"/"}>Inicio</Link>
            <Link href={"/acerca"}>Acerca</Link>
            <Link href={"/servicios"}>Servicios</Link>
            <Link href={"/contacto"}>Contacto</Link>
          </div>

          {/* Botón hamburguesa en móviles */}
          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-2 bg-white dark:bg-gray-900 shadow-md">
          <NavLink href="/" mobile>
            Inicio
          </NavLink>
          <NavLink href="/about" mobile>
            Acerca
          </NavLink>
          <NavLink href="/services" mobile>
            Servicios
          </NavLink>
          <NavLink href="/contact" mobile>
            Contacto
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  href,
  children,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) => (
  <a
    href={href}
    className={cn(
      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
      mobile
        ? "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
    )}
  >
    {children}
  </a>
);

export default Navbar;
