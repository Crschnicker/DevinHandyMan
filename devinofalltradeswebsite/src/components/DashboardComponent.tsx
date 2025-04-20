"use client";

import { useState } from "react";
import { useAuth, Appointment } from "@/lib/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCcw,
  Loader2,
  Video
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  } catch (e) {
    return dateString;
  }
};

// Helper function to get status badge color
const getStatusBadge = (status: Appointment["status"]) => {
  switch (status) {
    case "upcoming":
      return <Badge className="bg-primary">{status}</Badge>;
    case "completed":
      return <Badge className="bg-green-600">{status}</Badge>;
    case "canceled":
      return <Badge className="bg-red-600">{status}</Badge>;
    case "change-requested":
      return <Badge className="bg-amber-500">Change Requested</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export function Dashboard() {
  const { user, userAppointments, requestAppointmentChange } = useAuth();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [changeReason, setChangeReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  // Filter appointments by status
  const upcomingAppointments = userAppointments.filter(
    apt => apt.status === "upcoming" || apt.status === "change-requested"
  );
  const pastAppointments = userAppointments.filter(
    apt => apt.status === "completed" || apt.status === "canceled"
  );

  const handleRequestChange = async () => {
    if (!selectedAppointment) return;
    
    setIsSubmitting(true);
    try {
      await requestAppointmentChange(selectedAppointment.id);
      setSelectedAppointment(null);
      setChangeReason("");
    } catch (error) {
      console.error("Failed to request change:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock function for video recording/upload
  const handleVideoCapture = () => {
    // In a real app, this would handle video upload or recording
    console.log("Video capture functionality would be implemented here");
    setTimeout(() => {
      setIsVideoDialogOpen(false);
    }, 1500);
  };

  if (!user) {
    return (
      <div className="container-custom py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Please log in to view your dashboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">My Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar / User Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Account Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
              <TabsTrigger value="past">Past Services</TabsTrigger>
            </TabsList>

            {/* Upcoming Appointments */}
            <TabsContent value="upcoming" className="mt-6">
              {upcomingAppointments.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">You don't have any upcoming appointments</p>
                    <Button className="gold-button mt-4">Book a Service</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <Card key={appointment.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <h3 className="text-xl font-semibold text-primary">
                                {appointment.service}
                              </h3>
                              <p className="text-muted-foreground">{appointment.serviceOption}</p>
                            </div>
                            {getStatusBadge(appointment.status)}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate">{appointment.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>${appointment.totalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted p-6 md:w-48 md:flex-shrink-0 flex flex-col justify-center items-center space-y-3">
                          <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Video className="mr-2 h-4 w-4" />
                                Send Video
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Project Video</DialogTitle>
                                <DialogDescription>
                                  Record or upload a video of your project to help our technician prepare
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 flex justify-center">
                                <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center w-full">
                                  <Video className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                                  <p className="mb-2">Record a video or upload from your device</p>
                                  <div className="flex justify-center gap-2 mt-4">
                                    <Button onClick={handleVideoCapture}>
                                      Record Video
                                    </Button>
                                    <Button variant="outline" onClick={handleVideoCapture}>
                                      Upload Video
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full"
                                disabled={appointment.status === "change-requested"}
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Request Change
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Request Appointment Change</DialogTitle>
                                <DialogDescription>
                                  Let us know what changes you'd like to make to your appointment
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <Textarea
                                  placeholder="Please describe what you need to change (date, time, service details, etc.)"
                                  value={changeReason}
                                  onChange={(e) => setChangeReason(e.target.value)}
                                  className="min-h-[100px]"
                                />
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={handleRequestChange} 
                                  disabled={!changeReason.trim() || isSubmitting}
                                >
                                  {isSubmitting ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Submitting...
                                    </>
                                  ) : (
                                    "Submit Request"
                                  )}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button variant="ghost" className="w-full">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Past Appointments */}
            <TabsContent value="past" className="mt-6">
              {pastAppointments.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">You don't have any past appointments</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pastAppointments.map(appointment => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">
                              {appointment.service}
                            </h3>
                            <p className="text-muted-foreground">{appointment.serviceOption}</p>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{appointment.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>${appointment.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>

                        {appointment.status === "completed" && (
                          <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" className="w-full sm:w-auto">
                              Leave a Review
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}