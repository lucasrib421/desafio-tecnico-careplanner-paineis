from django.db import models

# Modelo para as colunas do Kanban
class Bucket(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Modelo para os cards (pacientes)
class Card(models.Model):
    bucket = models.ForeignKey(Bucket, on_delete=models.CASCADE, related_name='cards')
    name = models.CharField(max_length=100)  # Nome do paciente
    marital_status = models.CharField(max_length=20)  # Estado civil
    age = models.PositiveIntegerField()  # Idade
    gender = models.CharField(max_length=10)  # Sexo
    admission_date = models.DateField()  # Data de admissão

    def __str__(self):
        return self.name
