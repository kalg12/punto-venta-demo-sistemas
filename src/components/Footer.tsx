const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo o Nombre */}
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            MyBrand
          </div>

          {/* Enlaces */}
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <FooterLink href="/">Inicio</FooterLink>
            <FooterLink href="/about">Acerca</FooterLink>
            <FooterLink href="/services">Servicios</FooterLink>
            <FooterLink href="/contact">Contacto</FooterLink>
          </nav>
        </div>

        {/* Derechos de autor */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          © {new Date().getFullYear()} MyBrand. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
  >
    {children}
  </a>
);

export default Footer;
