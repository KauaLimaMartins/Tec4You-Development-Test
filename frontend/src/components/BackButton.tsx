import { AiOutlineArrowLeft} from 'react-icons/ai';
import { useRouter } from 'next/router';

export function BackButton() {
  const router = useRouter();

  return (
    <button className="absolute top-0 left-0 mt-4 ml-4" onClick={() => router.back()}>
      <AiOutlineArrowLeft size={28} color="#4f46e5" />
    </button>
  );
}
