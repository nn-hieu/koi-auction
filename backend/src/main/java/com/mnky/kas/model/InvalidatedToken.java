package com.mnky.kas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class InvalidatedToken {
    @Id
    private String id;
    private Date expirationTime;
}
