from django.db import models

# Modelo Base para herança
class ModelBase(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    modified_at = models.DateTimeField(auto_now=True, null=False)
    active = models.BooleanField(default=True, null=False)

    class Meta:
        managed = True
        abstract = True

# Usuário
class User(ModelBase):
    ROLES = (
        ('TECH', 'Técnico'),
        ('NURSE', 'Enfermagem'),
        ('ADMIN', 'Administrativo'),
    )
    username = models.CharField(max_length=150, unique=True, null=False)
    role = models.CharField(max_length=10, choices=ROLES, null=True)  # Tornei o role opcional

    class Meta:
        db_table = 'usuario'

# Material
class Material(ModelBase):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    expiration_date = models.DateField()
    serial = models.CharField(max_length=255)
    # Remover o campo 'performed_by' ou torná-lo opcional
    # performed_by = models.ForeignKey(User, on_delete=models.CASCADE)

    # Ou, caso queira mantê-lo mas permitir valores nulos:
    performed_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'material'


# Etapas do Processo
class Stage(ModelBase):
    # Definindo os tipos de etapas
    class Tipo(models.TextChoices):
        RECEBIMENTO = 'R', 'Recebimento: Etapa de recebimento dos materiais dos diversos setores do hospital'
        LAVAGEM = 'L', 'Lavagem: Etapa onde é feita uma lavagem dos materiais'
        ESTERILIZACAO = 'E', 'Esterilização: Etapa onde os materiais cirúrgicos são esterilizados com alta temperatura'
        DISTRIBUICAO = 'D', 'Distribuição: Etapa onde é feita a distribuição dos materiais cirúrgicos para os diversos setores do hospital'

    # Campos do modelo
    name = models.CharField(max_length=50, null=False)
    tipo = models.CharField(max_length=1, choices=Tipo.choices, blank=False, null=False)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'stage'

# Rastreabilidade
class Traceability(ModelBase):
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name='traceability_records')
    stage = models.ForeignKey(Stage, null=True, on_delete=models.SET_NULL)
    performed_by = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    failure = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.material.serial} - {self.stage.name} ({self.timestamp})"

    class Meta:
        db_table = 'traceability'
