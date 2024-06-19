package com.gateway.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@Getter
public class ExceptionResponseModel {

    private String errCode;
    private String err;
    private String errDetails;
    private Date date;
}