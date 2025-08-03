package com.olx.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PackageIdDto {
@JsonProperty(access = Access.READ_ONLY)
private int packageId;
@JsonProperty(access = Access.READ_ONLY)
private int userId;

}
