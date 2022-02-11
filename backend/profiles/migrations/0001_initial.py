# Generated by Django 3.2.7 on 2021-10-29 04:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='accounts.useraccount')),
                ('first_name', models.CharField(blank=True, default='firstname', max_length=220)),
                ('last_name', models.CharField(blank=True, default='lastname', max_length=220)),
                ('display_name', models.CharField(blank=True, default='displayname', max_length=220)),
                ('locations', models.CharField(blank=True, default='locations', max_length=220)),
                ('bio', models.TextField(blank=True, default='bio', max_length=1000)),
            ],
        ),
    ]