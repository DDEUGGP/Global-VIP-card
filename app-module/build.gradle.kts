plugins {
  id("com.android.application"
plugins {
    // Make sure that you have the AGP plugin 8.1+ dependency
    id("com.android.application") version "8.1.4" apply false
    // ...

    // Make sure that you have the Google services Gradle plugin 4.4.1+ dependency
    id("com.google.gms.google-services") version "4.4.3" apply false

    // Add the dependency for the Crashlytics Gradle plugin
    id("com.google.firebase.crashlytics") version "3.0.6" apply false
}
  // Add the Google services Gradle plugin
  id("com.google.gms.google-services")

  ...
}
plugins {
  id("com.android.application")
  // ...

  // Make sure that you have the Google services Gradle plugin
  id("com.google.gms.google-services")

  // Add the Crashlytics Gradle plugin
  id("com.google.firebase.crashlytics")
}
dependencies {
  // Import the Firebase BoM
dependencies {
    // Import the BoM for the Firebase platform
    implementation(platform("com.google.firebase:firebase-bom:34.1.0"))

    // Add the dependencies for the Crashlytics NDK and Analytics libraries
    // When using the BoM, you don't specify versions in Firebase library dependencies
    implementation("com.google.firebase:firebase-crashlytics-ndk")
    implementation("com.google.firebase:firebase-analytics")
}
  implementation(platform("com.google.firebase:firebase-bom:34.1.0"))


  // TODO: Add the dependencies for Firebase products you want to use
  // When using the BoM, don't specify versions in Firebase dependencies
  implementation("com.google.firebase:firebase-analytics")


  // Add the dependencies for any other desired Firebase products
  // https://firebase.google.com/docs/android/setup#available-libraries
}
