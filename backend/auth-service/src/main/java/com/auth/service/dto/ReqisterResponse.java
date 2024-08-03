package com.auth.service.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data

public class ReqisterResponse {

    private String message;

    public ReqisterResponse(String message){

        this.message=message;
    }


}
