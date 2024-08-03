package com.hotel.service.entity;


import com.hotel.service.Status.Status;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity

//@NoArgsConstructor
//@Getter
//@Setter
//@ToString
@Data

public class UserData {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(36)")
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private String createdBy;


    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date createdDate;

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date modifiedBy;


    @Enumerated(EnumType.STRING)
    private Status status;

}


