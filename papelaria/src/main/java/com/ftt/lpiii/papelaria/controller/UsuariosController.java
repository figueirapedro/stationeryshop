package com.ftt.lpiii.papelaria.controller;

import java.util.List;

import com.ftt.lpiii.papelaria.model.Usuarios;
import com.ftt.lpiii.papelaria.repository.UsuariosRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/usuarios" })

public class UsuariosController {
    private UsuariosRepository repository;

    UsuariosController(UsuariosRepository usuarioRepository) {
        this.repository = usuarioRepository;
    }

    @GetMapping
    public List findAll() {
        return repository.findAll();
    }

    @GetMapping(path = { "/{id}" })
    public ResponseEntity<Usuarios> findById(@PathVariable long id) {
        return repository.findById(id).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuarios create(Usuarios usuario) {
        return repository.save(usuario);
    }

    @PutMapping(value="/{id}")
  public @ResponseBody ResponseEntity<Usuarios> update(@PathVariable("id") long id, Usuarios Usuario){
    return repository.findById(id)
        .map(record -> {
            record.setName(Usuario.getName());
            record.setEmail(Usuario.getEmail());
            record.setSenha(Usuario.getSenha());
            Usuarios updated = repository.save(record);
            return ResponseEntity.ok().body(updated);
        }).orElse(ResponseEntity.notFound().build());
  }

    @DeleteMapping(path ={"/{id}"})
  public ResponseEntity<?> delete(@PathVariable("id") long id) {
    return repository.findById(id)
        .map(record -> {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
  }
}
