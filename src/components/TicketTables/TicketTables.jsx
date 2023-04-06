import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./TicketTables.css";
import moment from "moment-timezone";
import { List, MessageSquare, Edit3 } from "react-feather";
import AddTicketModal from "../AddTicketModal/AddTicketModal";
import Services from "../../services/http";
import { Trash } from "react-feather";
import { Alert } from "@mui/material";

const TicketTables = () => {
  const user = localStorage.getItem('user');
  const logedInUser = JSON.parse(user);
  const userName = logedInUser.user.user_name;
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [rowDetails, setRowDetails] = useState({});
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [bol, setBol] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [check, setCheck] = useState(true);

  const deleteCommet = async (cid) => {
    try {
      const deletedComment = await Services.deleteComment(rowDetails._id, cid);
      console.log("deletedComment =>", deletedComment);
      setBol(1);
    } catch (error) {
      console.log(`deleteComment api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  const changeToEditMode = () => {
    setIsEditMode(true);
  };

  const handleEnter = async (e, id, username, comment) => {
    try {
      if (e.key === "Enter") {
        var obj = {
          update_data: {
            id: id,
            comment: comment,
            username: username,
          },
        };
        const updatedComment = await Services.updateComment(
          obj,
          rowDetails._id
        );
        console.log("------>", updatedComment);
        setBol(1);
        setIsEditMode(false);
      }
    } catch (error) {
      console.log(`updateComment api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  const handleRowDetails = async (data) => {
    setRowDetails({ ...data });
    setTicketId(data._id);
    console.log({ data });
    getComments(data._id);
  };

  const getTickets = async () => {
    try {
      const tickets = await Services.getAllTickets();
      console.log({ tickets: tickets.data.data });
      setCountries(tickets.data.data);
      setFilteredTickets(tickets.data.data);
    } catch (error) {
      console.log(`getAllTickets api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  const handleOnClick = async () => {
    try {
      const updateComment = await Services.addComment({
        ticketId: rowDetails._id,
        comments: [
          {
            username: userName,
            comment: commentText,
          },
        ],
      });
      console.log(`==>`, updateComment);
      setBol(1);
      setCommentText("");
    } catch (error) {
      console.log(`addComment api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  const getComments = async (id) => {
    try {
      const comments = await Services.getCommentsByTicketId(id);
      console.log({ comment: comments.data });
      setBol(0);
      setComments(
        comments?.data?.data[0]
          ? comments?.data?.data[0].comments
          : comments.data.data
      );
    } catch (error) {
      console.log(`getCommentsByTicketId api error`, error);
      setError(true);
      setErrMsg(error.message);
    }
  };

  useEffect(() => {
    if (check) {
      setCheck(false);
    } else {
      getComments(ticketId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments.id, comments.username, comments.comment, commentText, bol]);

  useEffect(() => {
    getTickets();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.product.toLowerCase().match(search.toLowerCase());
    });
    setFilteredTickets(result);
  }, [search, countries]);

  const columns = [
    {
      name: "#Id",
      selector: (row) => row._id,
    },
    {
      name: "Ticket",
      selector: (row) => row.ticket_name,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            onClick={() => handleRowDetails(row)}
            style={{ background: "#ffffff", border: "none" }}
          >
            <i
              className="bi bi-pencil-square"
              style={{
                marginRight: "8px",
                background: "#ffffff",
                color: "black",
                fontSize: "20px",
              }}
            ></i>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            style={{ marginTop: "78px", borderRadius: "10px" }}
          >
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel" style={{ marginLeft: "40px" }}>
                #{rowDetails._id}
              </h5>
            </div>
            <div className="offcanvas-body">
              <div
                className="pb-5"
                style={{ fontSize: "22px", fontWeight: "500" }}
              >
                <i className="bi bi-square-fill text-warning pe-3"></i>
                {rowDetails.ticket_name} <Edit3 />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  <h5>
                    <List /> Description
                  </h5>
                </label>
                <textarea
                  className="form-control"
                  placeholder="Add a description here..."
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={rowDetails.ticket_desc}
                ></textarea>
              </div>

              <h5 className="mt-3">
                <MessageSquare /> Comment
              </h5>
              <div className="form-group">
                <textarea
                  className="form-control rounded-0"
                  style={{ fontSize: "15px" }}
                  placeholder="Leave a comment here"
                  rows="4"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mt-2 me-1 text-end">
                <button
                  className="btn btn-primary p-2"
                  style={{
                    background: "#ffc107",
                    border: "none",
                    color: "black",
                  }}
                  onClick={handleOnClick}
                >
                  Comment
                </button>
              </div>
              {comments &&
                comments.map((item) => {
                  return (
                    <p key={item.id}>
                      <strong style={{ paddingRight: "12px" }}>
                        {item.username}
                      </strong>
                      <span style={{ fontSize: "12px" }}>
                        {item.date
                          ? moment(item.date)
                              .tz("Asia/Kolkata")
                              .format("MMM DD YYYY, h:mm A")
                          : ""}
                      </span>
                      <br />
                      {isEditMode ? (
                        userName === item.username &&
                        isEditMode &&
                        item.id === commentId ? (
                          <div className="trash">
                            <input
                              type="text"
                              defaultValue={item.comment}
                              onKeyDown={(e) => {
                                handleEnter(
                                  e,
                                  item.id,
                                  item.username,
                                  e.target.value
                                );
                              }}
                            />
                            <Trash onClick={() => deleteCommet(item.id)} />
                          </div>
                        ) : userName === item.username && isEditMode ? (
                          <div className="trash">
                            {item.comment}
                            <Trash onClick={() => deleteCommet(item.id)} />
                          </div>
                        ) : (
                          <div>{item.comment}</div>
                        )
                      ) : userName === item.username ? (
                        <div
                          className="trash"
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            changeToEditMode();
                            setCommentId(item.id);
                          }}
                        >
                          {item.comment}
                          <Trash onClick={() => deleteCommet(item.id)} />
                        </div>
                      ) : (
                        <div>{item.comment}</div>
                      )}
                    </p>
                  );
                })}
            </div>
          </div>
        </>
      ),
    },
  ];

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

      <AddTicketModal />
      <DataTable
        fixedHeader
        columns={columns}
        data={filteredTickets}
        pagination
        fixedHeaderScrollHeight="420px"
        subHeader
        ResponsiveWrapper
        subHeaderComponent={
          <input
            type="text"
            placeholder="Filter Tickets..."
            className="w-25 form-control p-3 text-start search_bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        // progressPending
        // progressComponent
      />
    </>
  );
};

export default TicketTables;
