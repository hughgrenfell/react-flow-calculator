import Sidebar from '@/components/Sidebar';
import FlowEditor from '@/components/FlowEditor';

export default function Home() {
  return (
    <main className="flex border-blue-500 h-screen">
      <Sidebar />
      <FlowEditor />
    </main>
  );
}