package com.mnky.kas.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private boolean success;
    private int code;
    private String message;
    private T data;

    public ApiResponse() {
        success = true;
        code = 200;
    }
}
