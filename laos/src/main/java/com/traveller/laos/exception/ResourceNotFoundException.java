package com.traveller.laos.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " với id " + id + " không tồn tại");
    }

    public ResourceNotFoundException(String resource, String field, String value) {
        super(resource + " với " + field + " '" + value + "' không tồn tại");
    }
}
