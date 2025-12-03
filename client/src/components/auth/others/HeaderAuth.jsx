function HeaderAuth({
  title,
  subtitle,
}) {
  return (
    <div className="text-center">
      <img src="/logo.png" alt="Music Magic" className="h-20 mx-auto mb-4" />
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm text-gray-400">
        {subtitle}
      </p>
    </div>
  );  
}

export default HeaderAuth;
