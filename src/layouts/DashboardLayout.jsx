import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarProvider } from '../components/ui/Sidebar';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-1">
          <Outlet /> 
        </div>
      </div>
    </SidebarProvider>
  );
}
