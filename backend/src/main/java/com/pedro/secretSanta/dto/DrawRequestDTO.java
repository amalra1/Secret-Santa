package com.pedro.secretSanta.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrawRequestDTO {
    private String groupName;
    private List<ParticipantDTO> participants;
}