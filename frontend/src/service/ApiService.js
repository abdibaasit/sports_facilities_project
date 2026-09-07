import axios from "axios"

export default class ApiService {

    static BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4040"


    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /***USERS */


    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is the  to get a single user */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This is the  to get user bookings by the user id */
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is to delete a user */
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /**Facility */
    /* This  adds a new facility to the database */
    static async addFacility(formData) {
        const result = await axios.post(`${this.BASE_URL}/facilities/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    /* This  gets all availavle facilities */
    static async getAllAvailableFacilities() {
        const result = await axios.get(`${this.BASE_URL}/facilities/available/all`)
        return result.data
    }


    /* This  gets all availavle by time facilities from the database with a given time and day and a facility type */
    static async getAvailableFacilitiesByTimeTypeAndDay(startTime, endTime, facilityType, dayOfWeek) {
        const result = await axios.get(
            `${this.BASE_URL}/facilities/available?startTime=${startTime}&endTime=${endTime}&facilityType=${facilityType}&dayOfWeek=${dayOfWeek}`,
        )
        return result.data
    }

    /* This  gets all facilities types from thee database */
    static async getFacilityTypes() {
        const response = await axios.get(`${this.BASE_URL}/facilities/types`)
        return response.data
    }
    /* This  gets all facilities from the database */
    static async getAllFacilities() {
        const result = await axios.get(`${this.BASE_URL}/facilities/all`)
        return result.data
    }
    /* This funcction gets a facility by the id */
    static async getFacilityById(facilityId) {
        const result = await axios.get(`${this.BASE_URL}/facilities/${facilityId}`)
        return result.data
    }

    /* This  deletes a facility by the Id */
    static async deleteFacility(facilityId) {
        const result = await axios.delete(`${this.BASE_URL}/facilities/delete/${facilityId}`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This updates a facility */
    static async updateFacility(facilityId, formData) {
        const result = await axios.put(`${this.BASE_URL}/facilities/update/${facilityId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }


    /**BOOKING */
    /* This  saves a new booking to the databse */
    static async saveBooking(facilityId, userId, booking) {

        console.log("USER ID IS: " + userId)

        const response = await axios.post(`${this.BASE_URL}/bookings/book/${facilityId}/${userId}`, booking, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This  gets alll bokings from the database */
    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This  get booking by the cnfirmation code */
    static async getBookingByConfirmationCode(bookingCode) {
        const result = await axios.get(`${this.BASE_URL}/bookings/by-confirmation/${bookingCode}`)
        return result.data
    }

    /* This is the  to cancel user booking */
    static async cancelBooking(bookingId) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        })
        return result.data
    }


    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}
// export default new ApiService();