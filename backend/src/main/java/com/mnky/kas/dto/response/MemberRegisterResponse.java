package com.mnky.kas.dto.response;

import com.mnky.kas.model.Gender;
import com.mnky.kas.model.Member;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRegisterResponse implements Serializable {
    private short id;
    private String username;
    private String email;
    private String phone;
    private String address;
    private String firstname;
    private String lastname;
    private Gender gender;
    private Member.Role role;
}
