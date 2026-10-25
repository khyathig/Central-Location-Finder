```groovy
pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    environment {
        BACKEND_IMAGE  = "clf-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "clf-frontend:${BUILD_NUMBER}"
        BACKEND_DIR    = 'backend'
        FRONTEND_DIR   = 'frontend'
        DOCKER_EXE     = 'C:\\Users\\khyat\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir(env.BACKEND_DIR) {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend Dependencies') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'npm ci'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir(env.BACKEND_DIR) {
                    sh 'npm test'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'CI=true npm test -- --watchAll=false --passWithNoTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat '"%DOCKER_EXE%" --version'
                bat '"%DOCKER_EXE%" info'

                bat '"%DOCKER_EXE%" build --pull -t %BACKEND_IMAGE% .\\backend'
                bat '"%DOCKER_EXE%" build --pull -t %FRONTEND_IMAGE% .\\frontend'

                bat '"%DOCKER_EXE%" tag %BACKEND_IMAGE% clf-backend:latest'
                bat '"%DOCKER_EXE%" tag %FRONTEND_IMAGE% clf-frontend:latest'
            }
        }
    }

    post {
        success {
            echo "Built ${BACKEND_IMAGE} and ${FRONTEND_IMAGE} successfully."
        }

        failure {
            echo 'The pipeline failed. Review the console output for the failing stage.'
        }

        always {
            echo 'Central Location Finder CI pipeline execution completed.'
        }
    }
}
```
