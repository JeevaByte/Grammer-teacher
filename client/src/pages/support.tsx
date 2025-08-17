import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, HelpCircle, Shield, FileText, Cookie, Eye } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Support Center</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to common questions and learn about our policies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                Help Center
              </CardTitle>
              <CardDescription>
                Get answers to frequently asked questions and troubleshooting guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Common Questions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• How do I reset my password?</li>
                    <li>• How do I book a lesson with a teacher?</li>
                    <li>• How are quiz scores calculated?</li>
                    <li>• Can I retake a quiz?</li>
                    <li>• How do I access premium resources?</li>
                  </ul>
                </div>
                <Button className="w-full" data-testid="help-center-button">
                  Visit Help Center
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Privacy Policy
              </CardTitle>
              <CardDescription>
                Learn how we collect, use, and protect your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Points</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• We protect your personal data</li>
                    <li>• We don't sell your information</li>
                    <li>• You can request data deletion</li>
                    <li>• Secure data transmission</li>
                  </ul>
                </div>
                <Button className="w-full" variant="outline" data-testid="privacy-policy-button">
                  Read Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Terms of Service
              </CardTitle>
              <CardDescription>
                Understand the rules and guidelines for using Grammar Master
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Important Terms</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Account responsibilities</li>
                    <li>• Payment and refund policies</li>
                    <li>• Acceptable use guidelines</li>
                    <li>• Intellectual property rights</li>
                  </ul>
                </div>
                <Button className="w-full" variant="outline" data-testid="terms-service-button">
                  Read Terms of Service
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="h-5 w-5 mr-2 text-primary" />
                Cookie Policy
              </CardTitle>
              <CardDescription>
                Information about how we use cookies and similar technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Cookie Usage</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Essential cookies for functionality</li>
                    <li>• Analytics for improvement</li>
                    <li>• User preference storage</li>
                    <li>• No third-party tracking</li>
                  </ul>
                </div>
                <Button className="w-full" variant="outline" data-testid="cookie-policy-button">
                  Read Cookie Policy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Accessibility
              </CardTitle>
              <CardDescription>
                Our commitment to making Grammar Master accessible to everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Accessibility Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Keyboard navigation support</li>
                    <li>• Screen reader compatibility</li>
                    <li>• High contrast mode</li>
                    <li>• Adjustable font sizes</li>
                    <li>• Alternative text for images</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you encounter any accessibility barriers while using Grammar Master, 
                    please contact our support team for assistance.
                  </p>
                  <Button data-testid="accessibility-help-button">
                    Contact Accessibility Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link href="/dashboard">
            <Button data-testid="contact-support-button">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}