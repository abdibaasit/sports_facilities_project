package com.basitdev.service.inter;

import com.basitdev.dto.LoginRequest;
import com.basitdev.dto.Response;
import com.basitdev.entity.User;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUSerBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);
}
