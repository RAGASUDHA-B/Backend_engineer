import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container mt-4">

          <h2 className="mb-4">
            Dashboard
          </h2>

          <div className="row">

            <div className="col-md-3">

              <div className="card shadow">

                <div className="card-body text-center">

                  <h5>Total Assets</h5>

                  <h1>120</h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow">

                <div className="card-body text-center">

                  <h5>Allocated</h5>

                  <h1>50</h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow">

                <div className="card-body text-center">

                  <h5>Available</h5>

                  <h1>70</h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow">

                <div className="card-body text-center">

                  <h5>Departments</h5>

                  <h1>6</h1>

                </div>

              </div>

            </div>

          </div>

          <div className="row mt-5">

            <div className="col-md-12">

              <div className="card shadow">

                <div className="card-header">

                  Recent Activity

                </div>

                <div className="card-body">

                  <table className="table">

                    <thead>

                      <tr>

                        <th>Activity</th>

                        <th>Status</th>

                      </tr>

                    </thead>

                    <tbody>

                      <tr>

                        <td>Asset Registered</td>

                        <td>Completed</td>

                      </tr>

                      <tr>

                        <td>Asset Allocated</td>

                        <td>Completed</td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;