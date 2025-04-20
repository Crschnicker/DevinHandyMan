from setuptools import setup, find_packages

setup(
    name="devin_api",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Flask",
        "Flask-Cors",
        "Flask-JWT-Extended",
        "Flask-SQLAlchemy",
        "email_validator",
        "python-dotenv",
        "marshmallow",
        "bcrypt",
        "pytest",
    ],
)