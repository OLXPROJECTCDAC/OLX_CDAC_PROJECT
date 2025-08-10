package com.olx.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "wishlists")
public class WishlistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name="note")
    private String note;

    public Long getId() { return id; }
    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
