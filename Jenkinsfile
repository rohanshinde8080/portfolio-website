pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/rohanshinde8080/portfolio-website.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Portfolio Website'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Portfolio Website'
            }
        }

    }
}
