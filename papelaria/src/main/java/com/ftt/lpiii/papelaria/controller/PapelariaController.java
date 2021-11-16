package com.ftt.lpiii.papelaria.controller;

import java.util.List;

import com.ftt.lpiii.papelaria.model.Papelaria;
import com.ftt.lpiii.papelaria.repository.PapelariaRepository;

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
@RequestMapping({ "/papelaria" })

public class PapelariaController {
    private PapelariaRepository repository;

    PapelariaController(PapelariaRepository papelariaRepository) {
        this.repository = papelariaRepository;
    }

    @GetMapping
    public List findAll() {
        return repository.findAll();
    }

    @GetMapping(path = { "/{id}" })
    public ResponseEntity<Papelaria> findById(@PathVariable long id) {
        return repository.findById(id).map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public @ResponseBody Papelaria create( Papelaria produto) {
        return repository.save(produto);
    }

@PutMapping(value="/{id}")
  public @ResponseBody ResponseEntity<Papelaria> update(@PathVariable("id") long id, Papelaria papelaria){
    return repository.findById(id)
        .map(record -> {
            record.setName(papelaria.getName());
            record.setDescricao(papelaria.getDescricao());
            record.setImagem(papelaria.getImagem());
            record.setPreco(papelaria.getPreco());
            Papelaria updated = repository.save(record);
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
