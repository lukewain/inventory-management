import Link from "next/link";
import "./globals.css";
import { CarouselInfo } from "./ActionCarousel";

function AdminDashboard() {
  return (
    <div className="flex flex-col" id="dashboard">
      <div id="dashboard-title">
        <h1 className="text-xl font-bold" id="admin-title">
          Admin Dashboard
        </h1>
      </div>

      {/* <div className="flex flex-col md:flex-row w-[90%] mx-auto">
        <div className="flex w-1/3 mx-auto">
          <div className="card w-100% shadow-xl" id="recent-items">
            <div className="card-body">
              <h2 className="justify-center card-title mb-3">Devices</h2>
              <p className="justify-center text-center">
                View, modify and create devices!
              </p>
              <div className="card-actions justify-center mt-5">
                <Link href="/admin/devices" className="btn btn-primary">
                  Manage Devices
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/3 mx-auto">
          <div className="card w-100% shadow-xl" id="recent-items">
            <div className="card-body">
              <h2 className="justify-center card-title mb-3">Users</h2>
              <p className="justify-center text-center">
                View, modify and create users!
              </p>
              <div className="card-actions justify-center mt-5">
                <Link href="/admin/users" className="btn btn-primary">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/3 mx-auto">
          <div className="card w-100% shadow-xl" id="recent-items">
            <div className="card-body">
              <h2 className="justify-center card-title mb-3">Devices</h2>
              <p className="justify-center text-center">
                View, modify and create devices!
              </p>
              <div className="card-actions justify-center mt-5">
                <Link href="/admin/devices" className="btn btn-primary">
                  Manage Devices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <CarouselInfo />
    </div>
  );
}

function AccessError() {
  return (
    <div id="access-error">
      <h1 className="text-xl">You do not have access to this page.</h1>
    </div>
  );
}

export { AdminDashboard, AccessError };
