"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Database, Shield, Settings, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

export function FirebaseSetupInstructions() {
  const [copiedRules, setCopiedRules] = useState(false)

  const securityRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read and write access to the dictionary collection
    // Note: This is for development/demo purposes. In production, consider adding authentication
    match /dictionary/{document} {
      allow read, write: if true;
    }
    
    // Deny access to all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`

  const copyRules = async () => {
    try {
      await navigator.clipboard.writeText(securityRules)
      setCopiedRules(true)
      setTimeout(() => setCopiedRules(false), 2000)
    } catch (err) {
      console.error("Failed to copy rules:", err)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Firebase Setup Required</h1>
        <p className="text-muted-foreground">Complete these steps to enable the SpeakALA dictionary functionality</p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> You need to configure Firebase security rules to allow the app to read and write
          dictionary data.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Step 1: Configure Firestore Security Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                1. Go to your{" "}
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Firebase Console <ExternalLink className="h-3 w-3" />
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                2. Select your project: <Badge variant="secondary">speakala</Badge>
              </p>
              <p className="text-sm text-muted-foreground">
                3. Navigate to <strong>Firestore Database</strong> → <strong>Rules</strong>
              </p>
              <p className="text-sm text-muted-foreground">4. Replace the existing rules with the rules below:</p>

              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{securityRules}</code>
                </pre>
                <Button
                  onClick={copyRules}
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-transparent"
                >
                  {copiedRules ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Rules
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                5. Click <strong>Publish</strong> to save the changes
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Step 2: Verify Environment Variables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Ensure these environment variables are set in your Vercel project:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
              <Badge variant="outline">NEXT_PUBLIC_FIREBASE_API_KEY</Badge>
              <Badge variant="outline">NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</Badge>
              <Badge variant="outline">NEXT_PUBLIC_FIREBASE_PROJECT_ID</Badge>
              <Badge variant="outline">NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</Badge>
              <Badge variant="outline">NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</Badge>
              <Badge variant="outline">NEXT_PUBLIC_FIREBASE_APP_ID</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">Still seeing permission errors?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Make sure you clicked "Publish" after updating the security rules</li>
                <li>Wait a few minutes for the rules to propagate</li>
                <li>Refresh the SpeakALA website</li>
                <li>Check that your Firebase project ID matches the one in your environment variables</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Environment variable issues?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Verify all environment variables are set in your Vercel project settings</li>
                <li>Make sure there are no extra spaces or quotes in the variable values</li>
                <li>Redeploy your project after updating environment variables</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertDescription>
          <strong>Security Note:</strong> The current rules allow public read/write access for development purposes. For
          production, consider implementing user authentication and more restrictive rules.
        </AlertDescription>
      </Alert>
    </div>
  )
}
