import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1";

class Services {
  getAllUser() {
    return axios.get(baseUrl + "/user");
  }

  getAllTickets() {
    return axios.get(baseUrl + "/ticket");
  }

  createTicket(request_data) {
    return axios.post(baseUrl + "/ticket", request_data);
  }

  signin(request_data) {
    return axios.post(baseUrl + "/auth/login", request_data);
  }

  getCommentsByTicketId(id) {
    return axios.get(baseUrl + `/comment/${id}`);
  }

  addComment(request_data) {
    return axios.post(baseUrl + "/comment", request_data);
  }

  updateComment(request_data, id) {
    return axios.put(baseUrl + `/comment/${id}`, request_data);
  }

  deleteComment(tid, cid) {
    return axios.delete(baseUrl + `/comment/${tid}/${cid}`);
  }

  signUp(request_data) {
    return axios.post(baseUrl + `/auth/register`, request_data);
  }
}

// Below we are exporting the object of employee, so that we acan directly use object in component.
// So we don't have to instantial a class object.
const serviceClass = new Services();

export default serviceClass;
