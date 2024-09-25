package com.customlauncher;


import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import android.graphics.drawable.Drawable;
import android.util.Base64;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.VectorDrawable;
import android.util.Log;

import java.io.ByteArrayOutputStream;
import com.facebook.react.bridge.ReactContextBaseJavaModule;


import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import android.content.Intent;
import android.content.pm.ResolveInfo;
import android.content.pm.PackageInfo;
import android.content.Context;
import android.content.Intent;
// import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.List;

public class LauncherModule extends ReactContextBaseJavaModule {

    // private final ReactApplicationContext reactContext;
    private static ReactApplicationContext reactContext;


    public LauncherModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext=reactContext;
    }

    @Override
    public String getName() {
        return "LauncherModule";
    }

    @ReactMethod
    public void getAllAppPackage(Promise promise) {
        try {
            PackageManager packageManager = getReactApplicationContext().getPackageManager();
            List<PackageInfo> packages = packageManager.getInstalledPackages(PackageManager.GET_META_DATA | PackageManager.GET_SHARED_LIBRARY_FILES);
            WritableArray apps = Arguments.createArray();

            for (PackageInfo packageInfo : packages) {
                WritableMap appInfo = Arguments.createMap();
                appInfo.putString("packageName", packageInfo.packageName);
                appInfo.putString("name", packageInfo.applicationInfo.loadLabel(packageManager).toString());
                apps.pushMap(appInfo);
            }

            promise.resolve(apps);
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }


    @ReactMethod
    public void getInstalledAppsWithIcon(Promise promise) {
        try {
            PackageManager pm = getReactApplicationContext().getPackageManager();;
            List<ApplicationInfo> apps = pm.getInstalledApplications(PackageManager.GET_META_DATA);
            WritableArray appsArray = Arguments.createArray();

            for (ApplicationInfo app : apps) {
                WritableMap appMap = Arguments.createMap();
                appMap.putString("packageName", app.packageName);
                appMap.putString("name", pm.getApplicationLabel(app).toString());

                // Get app icon as Base64
                Drawable icon = pm.getApplicationIcon(app);
                String iconBase64 = convertDrawableToBase64(icon);
                appMap.putString("icon", iconBase64);

                appsArray.pushMap(appMap);
            }

            promise.resolve(appsArray);
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }




    @ReactMethod
    public void getAllApps(Promise promise) {
        try {
            PackageManager packageManager = getReactApplicationContext().getPackageManager();
            List<PackageInfo> packages = packageManager.getInstalledPackages(PackageManager.GET_META_DATA);
            WritableArray apps = Arguments.createArray();

            for (PackageInfo p : packages) {
                WritableMap appInfo = Arguments.createMap();
                appInfo.putString("packageName", p.packageName);
                appInfo.putString("name", p.applicationInfo.loadLabel(packageManager).toString());
                // appInfo.putString("icon",p.applicationInfo.loadIcon)
                // Drawable icon = p.getApplicationIcon(p);
                // String iconBase64 = convertDrawableToBase64(icon);
                // appInfo.putString("icon", iconBase64);
                apps.pushMap(appInfo);
            }

            promise.resolve(apps);
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }

    @ReactMethod
    public void getApps(Promise promise) {
        List<WritableMap> apps = new ArrayList<>();
        PackageManager packageManager = getReactApplicationContext().getPackageManager();

        Intent intent = new Intent(Intent.ACTION_MAIN, null);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        List<ResolveInfo> allApps = packageManager.queryIntentActivities(intent, 0);
        for (ResolveInfo ri : allApps) {
            WritableMap appInfo = Arguments.createMap();
            appInfo.putString("packageName", ri.activityInfo.packageName);
            appInfo.putString("name", ri.loadLabel(packageManager).toString());
            apps.add(appInfo);
        }

        WritableArray result = Arguments.createArray();
        for (WritableMap app : apps) {
            result.pushMap(app);
        }
        promise.resolve(result);
    }

    @ReactMethod
    public void getInstalledApps(Promise promise) {
        try {
            PackageManager packageManager = getReactApplicationContext().getPackageManager();
            List<ApplicationInfo> apps = packageManager.getInstalledApplications(PackageManager.GET_META_DATA | PackageManager.GET_ACTIVITIES | ApplicationInfo.FLAG_SYSTEM);
            WritableArray result = Arguments.createArray();

            for (ApplicationInfo app : apps) {
                if (packageManager.getLaunchIntentForPackage(app.packageName) != null) {
                    WritableMap appInfo = Arguments.createMap();
                    appInfo.putString("packageName", app.packageName);
                    appInfo.putString("name", packageManager.getApplicationLabel(app).toString());
                    result.pushMap(appInfo);
                }
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }

    @ReactMethod
    public void launchApp(String packageName, Promise promise) {
        try {
            PackageManager packageManager = getReactApplicationContext().getPackageManager();
            Intent launchIntent = packageManager.getLaunchIntentForPackage(packageName);
            if (launchIntent != null) {
                getReactApplicationContext().startActivity(launchIntent);
                promise.resolve(null);
            } else {
                promise.reject("Error", "Cannot find launch intent for package: " + packageName);
            }
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }


    // @ReactMethod
    // public void launchActivity(String activityName, Promise promise) {
    //     try {
    //         String packageName = "com.android.tv.settings";
    //         Intent intent = new Intent();
    //         intent.setClassName(packageName, activityName);
    //         intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

    //         if (intent.resolveActivity(getReactApplicationContext().getPackageManager()) != null) {
    //             getReactApplicationContext().startActivity(intent);
    //             promise.resolve(true);
    //         } else {
    //             promise.reject("Error", "Activity not found: " + activityName);
    //         }
    //     } catch (Exception e) {
    //         promise.reject("Error", e);
    //     }
    // }

    @ReactMethod
    public void launchSettingsActivity(String activityName, Promise promise) {
        try {
            Intent intent = new Intent();
            intent.setClassName("com.android.tv.settings", activityName);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            PackageManager packageManager = getReactApplicationContext().getPackageManager();
            if (intent.resolveActivity(packageManager) != null) {
                getReactApplicationContext().startActivity(intent);
                promise.resolve(true);
            } else {
                // Log.e("TAG", "Activity not found: " + activityName);
                promise.reject("Error", "Activity not found: " + activityName);
            }
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }

        @ReactMethod
    public void openAboutSettings() {
        Intent intent = new Intent();
        intent.setClassName("com.android.tv.settings", "com.android.tv.settings.about.AboutActivity");
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }



    // @ReactMethod
    // public void setInstallationBlock(boolean isBlocked, Promise promise) {
    //     try {
    //         InstallationBlockService.setBlockEnabled(getReactApplicationContext(), isBlocked);
    //         promise.resolve(null);
    //     } catch (Exception e) {
    //         promise.reject("Error", e);
    //     }
    // }
    private String convertDrawableToBase64(Drawable drawable) {
        if (drawable instanceof BitmapDrawable) {
            Bitmap bitmap = ((BitmapDrawable) drawable).getBitmap();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
            return Base64.encodeToString(outputStream.toByteArray(), Base64.NO_WRAP);
        } else if (drawable instanceof VectorDrawable) {
            Bitmap bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bitmap);
            drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
            drawable.draw(canvas);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
            return Base64.encodeToString(outputStream.toByteArray(), Base64.NO_WRAP);
        } else {
            return null;
        }
    }
}
