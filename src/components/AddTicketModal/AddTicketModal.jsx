import { useState, useEffect } from "react";
import Services from "../../services/http";
import "./AddTicketModal.css";
import { Alert } from "@mui/material";

export default function AddTicketModal() {
  const user = localStorage.getItem('user');
  const logedInUser = JSON.parse(user);

  const [ticket, setTicket] = useState({
    product: "",
    ticketname: "",
    ticketdescription: "",
    created_by: logedInUser.user_id,
    assign_to: "",
    status: "",
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await Services.getAllUser();
        setUsers(users.data.data);
      } catch (error) {
        console.log(`fetchUser api error`, error);
        setError(true);
        setErrMsg(error.message);
      }
    }
    fetchUser();
  }, []);

  const onCategorySelection = (e) => {
    setTicket({ ...ticket, product: e.target.value });
  };

  const onStatusSelection = (e) => {
    setTicket({ ...ticket, status: e.target.value });
  };

  const onUserSelection = (e) => {
    setTicket({ ...ticket, assign_to: e.target.value });
  };

  const ticketdetailsOnChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async () => {
    try {
      const data = await Services.createTicket(ticket);
      if (!data.data.status) {
        setError(true);
        setErrMsg(data.data.message);
        return;
      }
      setTicket({
        product: "",
        ticketname: "",
        ticketdescription: "",
        created_by: "",
        assign_to: "",
        status: "",
      });
    } catch (error) {
      console.log(`createTicket api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  const onCloseHandle = () => {
    setError(false);
  };

  return (
    <>
      {error ? (
        <Alert variant="outlined" severity="error" onClose={onCloseHandle}>
          {errMsg}
        </Alert>
      ) : null}

      {/* <!-- Button trigger modal --> */}

      <button
        type="button"
        className="add_button"
        data-bs-toggle="modal"
        data-bs-target="#addTicketModal"
      >
        Add
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addTicketModal"
        tabIndex="-1"
        aria-labelledby="addTicketModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addTicketModalLabel">
                Add Ticket
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                className="form-control col-md-1"
                onChange={onCategorySelection}
              >
                <option value="0"> --Select Product-- </option>
                <option value="BUG"> Website </option>
                <option value="MOBILE_APP"> Mobile App </option>
                <option value="SUBSCRIPTION"> Subscription </option>
                <option value="GENERAL"> General </option>
                <option value="OTHER"> Other </option>
              </select>

              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Ticket Name:
                </label>
                <input
                  type="text"
                  name="ticketname"
                  className="form-control text-start pt-3 pb-4"
                  id="recipient-name"
                  placeholder="Enter ticket name"
                  value={ticket.ticketname}
                  onChange={ticketdetailsOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Ticket Description:
                </label>
                <textarea
                  className="form-control"
                  name="ticketdescription"
                  id="message-text1"
                  placeholder="Enter ticket description"
                  value={ticket.ticketdescription}
                  onChange={ticketdetailsOnChange}
                ></textarea>
              </div>
              <select
                className="form-control col-md-1"
                onChange={onUserSelection}
              >
                <option value="0"> --Assign To-- </option>
                {users?.map((el) => {
                  return (
                    <option key={el._id} value={el._id}>
                      {el.user_name}
                    </option>
                  );
                })}
              </select>
              <select
                className="form-control col-md-1 mt-4"
                onChange={onStatusSelection}
              >
                <option value="0"> --Status-- </option>
                <option value="BACKLOG"> Backlog </option>
                <option value="INPROGRESS"> Inprogress </option>
                <option value="DONE"> Done </option>
              </select>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={handleOnSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
