# Generated by Django 3.2.7 on 2022-07-25 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0008_alter_profile_display_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='display_name',
            field=models.CharField(blank=True, default='user-uOWaSsyDYIOTbASFYRPE', max_length=220),
        ),
    ]