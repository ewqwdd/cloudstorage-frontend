import Outter from "./(ui)/Outter";

interface PageProps {
    params: {
      id: string;
    };
  }

export default function page({params: {id}}: PageProps) {
  return (
    <Outter>
        <div className="max-w-6xl mx-auto px-4">
            <img src={process.env.NEXT_PUBLIC_API_URL + "uploads/" + id} alt='image' />
        </div>
    </Outter>
  )
}
