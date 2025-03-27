import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '/lib/firebaseConfig';

const Header = () => {
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="w-full bg-gray-900 bg-opacity-80 py-4 px-6 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">Internship Hub</h1>
      <nav className="flex-1 flex justify-center space-x-6">
        <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link href="/find-internships" className="hover:text-gray-300">Find Internships</Link>
        <Link href="/applications" className="hover:text-gray-300">Applications</Link>
        <Link href="/profile" className="hover:text-gray-300">Profile</Link>
      </nav>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Logout</button>
    </header>
  );
};

export default Header;
