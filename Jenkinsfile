pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    environment {
        BACKEND_IMAGE = "clf-backend:${env.BUILD_NUMBER}"
        FRONTEND_IMAGE = "clf-frontend:${env.BUILD_NUMBER}"
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
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
                sh "docker build --pull -t ${BACKEND_IMAGE} ./${BACKEND_DIR}"
                sh "docker build --pull -t ${FRONTEND_IMAGE} ./${FRONTEND_DIR}"
                sh "docker tag ${BACKEND_IMAGE} clf-backend:latest"
                sh "docker tag ${FRONTEND_IMAGE} clf-frontend:latest"
            }
        }
    }

    post {
        success {
            echo "Built ${BACKEND_IMAGE} and ${FRONTEND_IMAGE} successfully"
        }
        failure {
            echo 'The pipeline failed. Review console output for the failing stage.'
        }
    }
}
