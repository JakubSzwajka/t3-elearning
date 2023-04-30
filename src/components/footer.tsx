const Footer = () => {
  return (
    <footer className="fixed bottom-0 mt-auto w-full bg-gray-800 p-4">
      <div className="container mx-auto text-center">
        <p className="text-white">MyApp &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
