"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Camera,
  Image as ImageIcon,
  Upload,
  CalendarDays,
  Clock,
  CheckCircle,
  Calendar,
  FileText
} from "lucide-react";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM"
];

export function VirtualConsultation() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    projectDescription: "",
    preferredMethod: "video"
  });

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date,
        formattedDate: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric"
        })
      });
    }

    return dates;
  };

  const availableDates = generateDates();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: file.type,
      size: (file.size / 1024).toFixed(2) + " KB",
      file: URL.createObjectURL(file),
      uploadDate: new Date().toISOString()
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the data to your backend
    console.log({
      ...formData,
      date: selectedDate,
      time: selectedTime,
      files: uploadedFiles
    });
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      projectDescription: "",
      preferredMethod: "video"
    });
    setSelectedDate(null);
    setSelectedTime(null);
    setUploadedFiles([]);
    setIsSubmitted(false);
  };

  return (
    <section id="virtual-consultation" className="py-16 md:py-24 bg-muted/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Virtual Consultation
          </h2>
          <p className="text-muted-foreground text-lg">
            Get expert advice without an in-person visit. Schedule a virtual consultation
            or send photos of your project for a preliminary assessment.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Schedule Consultation</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload Project Photos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule">
              {!isSubmitted ? (
                <Card className="border-primary/5">
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">Schedule a Live Consultation</CardTitle>
                      <CardDescription>
                        Choose your preferred date, time, and method for your virtual consultation.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Your Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Project Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Date and Time Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Select Date & Time</h3>
                        <Label className="font-medium mb-2 block">Available Dates</Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
                          {availableDates.map((date, index) => (
                            <button
                              key={index}
                              type="button"
                              className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                                selectedDate && selectedDate.toDateString() === date.date.toDateString()
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "border-border hover:border-primary/40"
                              }`}
                              onClick={() => handleDateSelect(date.date)}
                            >
                              <span className="text-sm">{date.formattedDate}</span>
                            </button>
                          ))}
                        </div>

                        <Label className="font-medium mb-2 block">Available Times</Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`p-2 rounded-lg border transition-colors ${
                                selectedTime === time
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "border-border hover:border-primary/40"
                              }`}
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Consultation Method */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Consultation Method</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${
                              formData.preferredMethod === "video"
                                ? "bg-primary/10 border-primary text-primary"
                                : "border-border hover:border-primary/40"
                            }`}>
                              <input
                                type="radio"
                                name="preferredMethod"
                                value="video"
                                checked={formData.preferredMethod === "video"}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <Video className="h-8 w-8 mb-2" />
                              <span className="font-medium">Video Call</span>
                              <span className="text-xs text-center mt-1">Live chat with screen sharing</span>
                            </label>
                          </div>
                          <div>
                            <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${
                              formData.preferredMethod === "phone"
                                ? "bg-primary/10 border-primary text-primary"
                                : "border-border hover:border-primary/40"
                            }`}>
                              <input
                                type="radio"
                                name="preferredMethod"
                                value="phone"
                                checked={formData.preferredMethod === "phone"}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <Camera className="h-8 w-8 mb-2" />
                              <span className="font-medium">Phone Call</span>
                              <span className="text-xs text-center mt-1">Standard phone consultation</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Project Description */}
                      <div className="space-y-2">
                        <Label htmlFor="projectDescription">Project Description <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="projectDescription"
                          name="projectDescription"
                          value={formData.projectDescription}
                          onChange={handleInputChange}
                          placeholder="Please describe your project and any specific questions you have"
                          className="min-h-[100px]"
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="submit"
                        className="gold-button w-full sm:w-auto"
                        disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone || !formData.projectDescription}
                      >
                        Schedule Consultation
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="w-full sm:w-auto"
                      >
                        Reset Form
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              ) : (
                <Card className="border-primary/5 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">Consultation Scheduled!</CardTitle>
                    <CardDescription className="text-base">
                      Your virtual consultation has been successfully scheduled. We'll send you a confirmation email with connection details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-muted rounded-lg p-6 mb-6 text-left">
                      <div className="flex items-center mb-4">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">Consultation Details</span>
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="col-span-2 font-medium">
                            {selectedDate?.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-muted-foreground">Time:</span>
                          <span className="col-span-2 font-medium">{selectedTime}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-muted-foreground">Method:</span>
                          <span className="col-span-2 font-medium capitalize">
                            {formData.preferredMethod} {formData.preferredMethod === "video" ? "Call" : "Consultation"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      An email with instructions on how to join your consultation has been sent to <span className="font-medium">{formData.email}</span>.
                      Please check your inbox and spam folder.
                    </p>
                    <Button
                      onClick={resetForm}
                      className="gold-button"
                    >
                      Schedule Another Consultation
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="upload">
              {!isSubmitted ? (
                <Card className="border-primary/5">
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">Upload Project Photos</CardTitle>
                      <CardDescription>
                        Upload photos or videos of your project for a preliminary assessment without scheduling a live consultation.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Your Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="upload-name">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="upload-name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="upload-phone">Phone <span className="text-red-500">*</span></Label>
                            <Input
                              id="upload-phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="upload-email">Email <span className="text-red-500">*</span></Label>
                          <Input
                            id="upload-email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="upload-address">Project Address</Label>
                          <Input
                            id="upload-address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* File Upload */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Upload Files</h3>
                        <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center">
                          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                          <p className="mb-2">Drag and drop files here or click to browse</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Accepted file types: JPG, PNG, GIF, MP4, MOV (Max 20MB each)
                          </p>
                          <Input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('file-upload').click()}
                          >
                            Select Files
                          </Button>
                        </div>

                        {/* File List */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-medium">Uploaded Files</h4>
                            <div className="max-h-60 overflow-y-auto">
                              {uploadedFiles.map((file) => (
                                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                                  <div className="flex items-center gap-3">
                                    {file.type.includes('image') ? (
                                      <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                                        <img src={file.file} alt={file.name} className="w-full h-full object-cover" />
                                      </div>
                                    ) : (
                                      <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <FileText className="h-6 w-6 text-primary" />
                                      </div>
                                    )}
                                    <div className="overflow-hidden">
                                      <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                                      <p className="text-xs text-muted-foreground">{file.size}</p>
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => removeFile(file.id)}
                                  >
                                    <span className="sr-only">Remove file</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                      <path d="M3 6h18"></path>
                                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                      <line x1="10" y1="11" x2="10" y2="17"></line>
                                      <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Project Description */}
                      <div className="space-y-2">
                        <Label htmlFor="upload-projectDescription">Project Description <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="upload-projectDescription"
                          name="projectDescription"
                          value={formData.projectDescription}
                          onChange={handleInputChange}
                          placeholder="Please describe your project, areas of concern, and any specific questions you have"
                          className="min-h-[100px]"
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="submit"
                        className="gold-button w-full sm:w-auto"
                        disabled={uploadedFiles.length === 0 || !formData.name || !formData.email || !formData.phone || !formData.projectDescription}
                      >
                        Submit for Assessment
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="w-full sm:w-auto"
                      >
                        Reset Form
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              ) : (
                <Card className="border-primary/5 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">Files Submitted Successfully!</CardTitle>
                    <CardDescription className="text-base">
                      Thank you for submitting your project photos. Our team will review them and get back to you within 24-48 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-muted rounded-lg p-6 mb-6 text-left">
                      <div className="flex items-center mb-4">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">Submission Details</span>
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3">
                          <span className="text-muted-foreground">Files Submitted:</span>
                          <span className="col-span-2 font-medium">{uploadedFiles.length} file(s)</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="col-span-2 font-medium">
                            {new Date().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      A confirmation email has been sent to <span className="font-medium">{formData.email}</span>.
                      One of our specialists will contact you with their assessment and recommendations.
                    </p>
                    <Button
                      onClick={resetForm}
                      className="gold-button"
                    >
                      Submit Another Project
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/5">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get expert advice without leaving your home. Our virtual consultations are efficient and convenient.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/5">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Camera className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Detailed Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share photos and videos of your project for accurate estimates and professional advice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/5">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose a time that works for you. Virtual consultations are available during and outside regular business hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
