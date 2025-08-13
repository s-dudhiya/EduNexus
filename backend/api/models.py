from django.db import models

class CurrentSemMarks(models.Model):
    id = models.AutoField(primary_key=True)
    enrollment_number = models.IntegerField()
    subject_id = models.IntegerField()
    t1_marks = models.FloatField()
    t2_marks = models.FloatField()
    t3_marks = models.FloatField()
    current_sem = models.IntegerField()

class ExamPaper(models.Model):
    id = models.AutoField(primary_key=True)
    subject_id = models.IntegerField()
    sem=models.IntegerField()
    code_question = models.CharField(max_length=5600, blank=True, null=True)
    test_output_1 = models.CharField(max_length=2500, blank=True, null=True)
    test_output_2 = models.JSONField(blank=True, null=True)
    mcq_ques = models.JSONField()
    sem = models.IntegerField(null=True, blank=True)

class ExamResult(models.Model):
    id = models.AutoField(primary_key=True)
    enrollment_no = models.IntegerField()
    subject_id = models.IntegerField()
    code_marks = models.IntegerField()
    mcq_marks = models.IntegerField()
    test_name = models.CharField(max_length=50)

class Faculty(models.Model):
    fac_id = models.IntegerField(primary_key=True)
    fac_name = models.CharField(max_length=250)
    fac_mail = models.CharField(max_length=500)
    sem=models.IntegerField()
    pin = models.IntegerField()

class PastMarks(models.Model):
    id = models.AutoField(primary_key=True)
    enrollment_no = models.IntegerField()
    subject_id = models.IntegerField()
    semester = models.IntegerField()
    marks = models.FloatField()

class PracticalMarks(models.Model):
    id = models.AutoField(primary_key=True)
    enrollment_no = models.IntegerField()
    subject_id = models.IntegerField()
    semester = models.IntegerField()
    marks = models.FloatField()

class StudentData(models.Model):
    enrollment_no = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=500)
    gender = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    semester = models.IntegerField()
    contact_no = models.BigIntegerField()
    email_id = models.CharField(max_length=100)
    parents_contact = models.BigIntegerField()
    pin = models.IntegerField()

class SubjectDetails(models.Model):
    subject_id = models.IntegerField(primary_key=True)
    subject_name = models.CharField(max_length=250)
    sem = models.IntegerField()

class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    enrollment_no=models.IntegerField()
    semester=models.IntegerField()
    subject_id=models.IntegerField()
    subject_name=models.CharField(max_length=250)
    total_lectures=models.IntegerField()
    total_attended=models.IntegerField()
    attd_date=models.DateField(auto_now=True)
    
class Notes(models.Model):
    id = models.AutoField(primary_key=True)
    uploader_id=models.IntegerField()
    uploader_name=models.CharField(max_length=250)
    subject_name=models.CharField(max_length=250)
    desc=models.CharField(max_length=250)
    doc=models.BinaryField()
    sem=models.IntegerField()
    upload_date=models.DateField(auto_now=True)